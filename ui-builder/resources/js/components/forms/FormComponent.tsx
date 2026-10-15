import { FormConfig } from '../types';
import { renderComponent } from '../ComponentRegistry';

export function FormComponent({ config }: { config: FormConfig }) {
  const { props, actions } = config;
  const {
    fields = [],
    customComponents = [],
    submitButton,
    onSubmit: submitAction,
    className,
  } = props || {};

  console.log('FormComponent: customComponents:', customComponents);
  console.log('FormComponent: customComponents.length:', customComponents?.length);

  // Don't use react-hook-form for now - use native form handling
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Get form data from the native form element
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const data: any = {};
    
    // Convert FormData to plain object
    formData.forEach((value, key) => {
      // Handle array fields (checkboxes with same name)
      if (key.endsWith('[]')) {
        const arrayKey = key.slice(0, -2);
        if (!data[arrayKey]) {
          data[arrayKey] = [];
        }
        data[arrayKey].push(value);
      } else {
        // Handle checkboxes and booleans
        if (value === 'on' || value === 'true') {
          data[key] = true;
        } else if (value === 'false') {
          data[key] = false;
        } else {
          data[key] = value;
        }
      }
    });
    
    console.log('FormComponent: Form submitted with data:', data);
    
    if (actions?.submit || submitAction) {
      const action = actions?.submit || submitAction;
      const { type, command, event: eventName, url, method, payload } = action!;
      
      const submitData = { ...payload, ...data };
      
      console.log('FormComponent: Submitting to:', url, 'with data:', submitData);
      
      if (type === 'command' && command) {
        window.dispatchEvent(new CustomEvent('command:execute', { detail: { command, payload: submitData } }));
      } else if (type === 'emit' && eventName) {
        window.dispatchEvent(new CustomEvent(eventName, { detail: submitData }));
      } else if (type === 'http' && url) {
        fetch(url, {
          method: method || 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(submitData),
        })
        .then(async response => {
          const result = await response.json();
          console.log('FormComponent: Response status:', response.status);
          console.log('FormComponent: Response data:', result);
          
          if (response.ok) {
            // Success
            alert(`✓ ${result.message || 'Form submitted successfully!'}`);
            formElement.reset();
            window.dispatchEvent(new CustomEvent('form:success', { detail: result }));
          } else {
            // Error
            if (result.errors) {
              console.error('FormComponent: Validation errors:', result.errors);
              const errorList = Object.entries(result.errors)
                .map(([field, msgs]: [string, any]) => `• ${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
                .join('\n');
              alert(`Validation Errors:\n\n${errorList}`);
            } else {
              alert(`Error: ${result.error || result.message || 'Submission failed'}`);
            }
          }
          return result;
        })
        .catch(err => {
          console.error('FormComponent: Request failed:', err);
          alert(`Network Error: ${err.message}`);
        });
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className={className} id={config.id}>
      <div className="space-y-4">
        {fields.map((field) => {
          const { name, label, field: fieldComponent, validation, helperText } = field;

          return (
            <div key={name} className="space-y-2">
              {label && (
                <label htmlFor={name} className="text-sm font-medium">
                  {label}
                  {validation?.required && <span className="text-destructive ml-1">*</span>}
                </label>
              )}
              
              <div>
                {renderComponent(fieldComponent)}
              </div>
              
              {helperText && (
                <p className="text-sm text-muted-foreground">{helperText}</p>
              )}
            </div>
          );
        })}
        
        {/* Render custom components injected into the form */}
        {customComponents && customComponents.length > 0 && (
          <div className="space-y-4 mt-6">
            {customComponents.map((component, index) => (
              <div key={component.id || `custom-${index}`}>
                {renderComponent(component)}
              </div>
            ))}
          </div>
        )}
      </div>

      {submitButton && (
        <div className="mt-6">
          {renderComponent(submitButton)}
        </div>
      )}
    </form>
  );
}

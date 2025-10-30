import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Loader2 } from 'lucide-react';

interface Field {
  name: string;
  type: string;
  label: string;
  db_type: string;
  searchable: boolean;
  filterable: boolean;
  sortable: boolean;
}

interface FieldCapabilityTableProps {
  modelClass?: string;
  apiEndpoint?: string;
  onChange?: (data: Record<string, string[]>) => void;
  className?: string;
}

export const FieldCapabilityTableComponent: React.FC<FieldCapabilityTableProps> = ({
  modelClass: modelClassProp,
  apiEndpoint = '/api/ui/datasources/builder/fields',
  onChange,
  className = '',
}) => {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modelClass, setModelClass] = useState<string>(modelClassProp || '');

  // Listen to the model_class select field changes
  useEffect(() => {
    let selectElement: HTMLSelectElement | null = null;
    
    const findAndAttach = () => {
      // Try multiple selectors to find the model_class field
      selectElement = document.querySelector('select[name="model_class"]') as HTMLSelectElement;
      
      if (!selectElement) {
        selectElement = document.querySelector('#select-model') as HTMLSelectElement;
      }
      
      console.log('FieldCapabilityTable: Looking for model select field...', selectElement);
      
      if (selectElement) {
        const handleChange = () => {
          console.log('FieldCapabilityTable: Model changed to:', selectElement?.value);
          setModelClass(selectElement!.value);
        };
        
        // Set initial value
        if (selectElement.value) {
          console.log('FieldCapabilityTable: Initial model value:', selectElement.value);
          setModelClass(selectElement.value);
        }
        
        selectElement.addEventListener('change', handleChange);
        
        return () => {
          selectElement?.removeEventListener('change', handleChange);
        };
      } else {
        console.warn('FieldCapabilityTable: Could not find model_class select element');
      }
    };
    
    // Try immediately
    const cleanup = findAndAttach();
    
    // Also try after a short delay in case the form isn't rendered yet
    const timeout = setTimeout(() => {
      if (!selectElement) {
        findAndAttach();
      }
    }, 500);
    
    return () => {
      cleanup?.();
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!modelClass) {
      setFields([]);
      return;
    }

    loadFields();
  }, [modelClass]);

  const loadFields = async () => {
    if (!modelClass) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ model_class: modelClass }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.fields) {
        setFields(data.fields);
        notifyChange(data.fields);
      } else {
        throw new Error(data.error || 'Failed to load fields');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load fields');
      setFields([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCapabilityChange = (fieldName: string, capability: 'searchable' | 'filterable' | 'sortable', checked: boolean) => {
    const updatedFields = fields.map(field =>
      field.name === fieldName
        ? { ...field, [capability]: checked }
        : field
    );
    setFields(updatedFields);
    notifyChange(updatedFields);
  };

  const notifyChange = (currentFields: Field[]) => {
    if (!onChange) return;

    const result = {
      searchable: currentFields.filter(f => f.searchable).map(f => f.name),
      filterable: currentFields.filter(f => f.filterable).map(f => f.name),
      sortable: currentFields.filter(f => f.sortable).map(f => f.name),
    };

    onChange(result);
  };

  if (!modelClass) {
    return (
      <Alert className={className}>
        <AlertDescription>
          Please select a model class first to configure field capabilities.
        </AlertDescription>
      </Alert>
    );
  }

  if (loading) {
    return (
      <div className={`flex items-center gap-2 p-4 ${className}`}>
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm text-muted-foreground">Loading fields...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className={className}>
        <AlertDescription>
          Error loading fields: {error}
        </AlertDescription>
      </Alert>
    );
  }

  if (fields.length === 0) {
    return (
      <Alert className={className}>
        <AlertDescription>
          No fields found for the selected model.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className={`rounded-md border ${className}`}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30%]">Field</TableHead>
            <TableHead className="w-[15%]">Type</TableHead>
            <TableHead className="w-[18%] text-center">Searchable</TableHead>
            <TableHead className="w-[18%] text-center">Filterable</TableHead>
            <TableHead className="w-[18%] text-center">Sortable</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field) => (
            <TableRow key={field.name}>
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span>{field.label}</span>
                  <span className="text-xs text-muted-foreground">{field.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs">
                  {field.type}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center">
                  <Checkbox
                    checked={field.searchable}
                    onCheckedChange={(checked) =>
                      handleCapabilityChange(field.name, 'searchable', checked as boolean)
                    }
                  />
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center">
                  <Checkbox
                    checked={field.filterable}
                    onCheckedChange={(checked) =>
                      handleCapabilityChange(field.name, 'filterable', checked as boolean)
                    }
                  />
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center">
                  <Checkbox
                    checked={field.sortable}
                    onCheckedChange={(checked) =>
                      handleCapabilityChange(field.name, 'sortable', checked as boolean)
                    }
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Hidden inputs for form submission */}
      <input type="hidden" name="searchable_fields" value={fields.filter(f => f.searchable).map(f => f.name).join(',')} />
      <input type="hidden" name="filterable_fields" value={fields.filter(f => f.filterable).map(f => f.name).join(',')} />
      <input type="hidden" name="sortable_fields" value={fields.filter(f => f.sortable).map(f => f.name).join(',')} />
    </div>
  );
};

export default FieldCapabilityTableComponent;

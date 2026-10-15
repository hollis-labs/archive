import { default as React } from 'react';
interface FieldCapabilityTableProps {
    modelClass?: string;
    apiEndpoint?: string;
    onChange?: (data: Record<string, string[]>) => void;
    className?: string;
}
export declare const FieldCapabilityTableComponent: React.FC<FieldCapabilityTableProps>;
export default FieldCapabilityTableComponent;

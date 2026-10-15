import { componentRegistry } from '@/components/ComponentRegistry'
import { RowsLayout } from '@/components/layouts/RowsLayout'
import { ColumnsLayout } from '@/components/layouts/ColumnsLayout'
import { DataTableComponent } from '@/components/advanced/DataTableComponent'
import { SearchBarComponent } from '@/components/composites/SearchBarComponent'
import { ButtonIconComponent } from '@/components/primitives/ButtonIconComponent'

export function registerCoreComponents() {
  componentRegistry.register('rows', RowsLayout as any)
  componentRegistry.register('columns', ColumnsLayout as any)
  componentRegistry.register('table', DataTableComponent as any)
  componentRegistry.register('data-table', DataTableComponent as any)
  componentRegistry.register('search.bar', SearchBarComponent as any)
  componentRegistry.register('button.icon', ButtonIconComponent as any)
}

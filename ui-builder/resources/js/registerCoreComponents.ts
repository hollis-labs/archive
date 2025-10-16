import { componentRegistry } from '@/componentsComponentRegistry'
import { RowsLayout } from '@/componentslayouts/RowsLayout'
import { ColumnsLayout } from '@/componentslayouts/ColumnsLayout'
import { DataTableComponent } from '@/componentsadvanced/DataTableComponent'
import { SearchBarComponent } from '@/componentscomposites/SearchBarComponent'
import { ButtonIconComponent } from '@/componentsprimitives/ButtonIconComponent'

export function registerCoreComponents() {
  componentRegistry.register('rows', RowsLayout as any)
  componentRegistry.register('columns', ColumnsLayout as any)
  componentRegistry.register('table', DataTableComponent as any)
  componentRegistry.register('data-table', DataTableComponent as any)
  componentRegistry.register('search.bar', SearchBarComponent as any)
  componentRegistry.register('button.icon', ButtonIconComponent as any)
}

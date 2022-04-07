/* eslint-disable no-nested-ternary */
import { Column } from '~/types';
import TableRow from '~/components/TableRow';
import '~/assets/styles/components/table.less';
import { CurrencyHTML } from '~/mixins/helper';
import Button from '~/components/Button';
import ApiClient from '~/library/ApiClient';
import AddToast from '~/library/Toast';

interface TableProps<T> {
  data?: any
  columns?: Column[]
  is_router_link?: boolean
  router_builder?: string
  urlRemove?:string
  scopedSlotsRenderFunc?: (item: T, column: Column) => JSX.Element | undefined
}

function Table<T>(props: TableProps<T>) {
  const getValueByKey = (key: string, item: any) => {
    let value;
    if (key.includes('.')) {
      const keys = key.split('.');
      let inv: any = null;
      for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        if (index === 0) {
          inv = item[key];
        } else {
          inv = inv[key];
        }
      }
      value = inv;
    } else {
      value = item[key];
    }
    return value;
  };

  const routerLink = (item: any) => {
    if (!props.is_router_link) return;
    if (!props.router_builder) return;
    const text = item.id ? item.id : item.uid;
    const routerBuilder = `${props.router_builder}/${text}`;

    return routerBuilder;
  };

  const changeISOTimeToMyFormTime = (time: string) => {
    const date = new Date(time).getDate() < 10 ? `0${new Date(time).getDate()}` : `${new Date(time).getDate()}`;
    const month = new Date(time).getMonth() < 10 ? `0${new Date(time).getMonth() + 1}` : `${new Date(time).getMonth() + 1}`;
    return `${date}/${month}/${new Date(time).getFullYear()}`;
  };

  const handleRemove = async (e: any, id: string, index: number) => {
    try {
      // eslint-disable-next-line no-restricted-globals
      const x = confirm('Bạn chắc chắn muốn xóa ?');
      if (x) {
        e.target.parentElement.parentElement.remove();
        await new ApiClient().delete(props.urlRemove + id);
        AddToast('Success', 'Xóa thành công !', 'toast');
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="a-table">
      <div className="a-table-head">
        {props.columns ? props.columns.map((column) => (
          <span key={column.key} className={`${column.key} ${column.class} text-${column.align}`}>{column.title}</span>
        )) : ''}
      </div>

      <div className="a-table-content">
        {props.data ? props.data.map((row: any, i: any) => (
          <TableRow key={row.id} is_router_link={props.is_router_link} to={routerLink(row)}>
            {props.columns ? props.columns.map((column) => (
              // eslint-disable-next-line no-nested-ternary
              column.key === 'remove' ? (
                <div className="remove">
                  <Button className="btn bg-red-300 hover:bg-red-400 btn-icon text-white p-1 rounded text-sm" onClick={(e) => handleRemove(e, row.id, i)}>Remove</Button>
                </div>
              ) : column.scopedSlots && props.scopedSlotsRenderFunc ? props.scopedSlotsRenderFunc(row, column) : (
                column.isTime ? <span className={`${column.key} ${column.class} text-${column.align}`}>{changeISOTimeToMyFormTime(row[column.key])}</span>
                  : column.isCurrency ? <span className={`${column.key} ${column.class} text-${column.align}`}>{CurrencyHTML(row[column.key])}</span>
                    : <span className={`${column.key} ${column.class} text-${column.align}`}>{row[column.key]}</span>
              )
            )) : ''}
          </TableRow>
        )) : ''}
      </div>
    </div>
  );
}

export default Table;

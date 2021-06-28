import { FiSearch, FiFilter, FiArrowLeft, FiInfo } from 'react-icons/fi';
import Link from 'next/link';
import UniTag from '../components/UniTag';
import { SetStateAction } from 'react';

export interface UniFilterProps {
  list: string[]; // list of unis to include
  state: {
    list: string[];
    show: boolean;
  };
  action: React.Dispatch<SetStateAction<any>>;
}

const UniFilter: React.FC<UniFilterProps> = (props) => (
  // UniFilter is used for the search pages to filter the results
  <div className='flex  flex-wrap my-2'>
    {props.list.map((uni) => (
      <div
        key={uni}
        className={`w-1/4 px-1 py-1 ${
          props.state.list.includes(uni) ? 'opacity-100' : 'opacity-30'
        }`}
        onClick={() => {
          if (props.state.list.includes(uni)) {
            // toggle unis
            const updated: string[] = props.state.list.filter((u) => u !== uni);
            props.action({ ...props.state, list: updated });
          } else {
            props.action({ ...props.state, list: [...props.state.list, uni] });
          }
        }}
      >
        <UniTag uni={uni} />
      </div>
    ))}
  </div>
);

export default UniFilter;

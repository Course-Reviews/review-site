import { SetStateAction } from 'react';
import UniTag from './UniTag';

export interface UniFilterProps {
  list: string[]; // list of unis to include
  state: {
    value: string;
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
        className={`w-1/4 px-1 py-1 ${props.state.value === uni ? 'opacity-100' : 'opacity-30'}`}
        onClick={() => {
          props.action({ ...props.state, value: uni });
        }}
      >
        <UniTag uni={uni} />
      </div>
    ))}
  </div>
);

export default UniFilter;

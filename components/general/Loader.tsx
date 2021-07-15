import { CgSpinner } from 'react-icons/cg';

export interface LoaderProps {
  className: string | void;
}

const Loader: React.FC<LoaderProps> = (props) => (
  <div className={`animate-spin  ${props.className}`}>
    <CgSpinner />
  </div>
);

export default Loader;

export interface UniTagProps {
  uni: string;
}

const UniTag: React.FC<UniTagProps> = (props) => (
  // Uni tag shows which university an item belongs to and is primarily used in filters and search results
  // Todo improve color contrast for certain unis
  <div
    className={`text-${props.uni.toLocaleLowerCase()} text-white rounded-full  font-bold text-sm py-1 text-left`}
  >
    <span className='uppercase'>{props.uni}</span>
  </div>
);

export default UniTag;

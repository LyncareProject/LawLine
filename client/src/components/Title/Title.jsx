import './Title.css'

const Title = (props) => {
  return (
    <div>
      <h2 className='ComponentTitle'>{props.title}</h2>
    </div>
  );
};
export default Title;

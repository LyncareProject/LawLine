import './Title.css'

const Title = (props) => {
  return (
    <>
      <h2 className='ComponentTitle' style={{margin : props.margin}}>{props.title}</h2>
    </>
  );
};
export default Title;

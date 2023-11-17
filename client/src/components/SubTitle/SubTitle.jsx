import "./SubTitle.css";

const SubTitle = (props) => {
  return (
    <div className="SubTitle">
      <p className='ComponentSubTitle'>{props.subTitle}</p>
    </div>
  );
};

export default SubTitle;

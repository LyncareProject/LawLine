const Counsel = () => {
  return (
    <div className="Page">
      <div className="Wrap">
        <div className="Block">
          <h2 className="Title">
            제목 <span className="Gray">{"(10자 이상)"}</span>
            <span className="Red">*</span>
          </h2>
          <input
            className="Input"
            type="text"
            placeholder="1개의 질문을 구체적으로 입력해주세요."
          />
        </div>
        <div className="Block">
          <h2 className="Title">
            내용 <span className="Gray">{"(200자 이상)"}</span>
            <span className="Red">*</span>
          </h2>
          <textarea
            className="TextArea"
            placeholder="시간 순서에 따라 구체적으로 설명해주세요."
          />
        </div>
        <button className="Button">상담 신청</button>
      </div>
    </div>
  );
};

export default Counsel;

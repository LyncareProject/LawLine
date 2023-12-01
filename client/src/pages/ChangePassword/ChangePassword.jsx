import * as Yup from "yup";
import { updateUser } from "../../services/userService";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { useEffect } from "react";

const ChangePassword = ()=>{
  const { state } = useLocation();
  console.log(state)
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "비밀번호는 최소 8자리 이상입니다")
      .max(16, "비밀번호는 최대 16자리입니다!")
      .required("패스워드를 입력하세요!")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[^\s]*$/,
        "알파벳, 숫자, 공백을 제외한 특수문자를 모두 포함해야 합니다!"
      ),
    password2: Yup.string()
      .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다!")
      .required("필수 입력 값입니다!"),
  });

  const submit = async (values) => {
    const { password } = values;
    await updateUser({ id: state, password })
      .then(() => {
        toast.success(<h3>비밀번호 변경이 완료되었습니다.</h3>, {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) =>
        toast.error(err.response.data.message + "😭", {
          position: "top-center",
        })
      );
  };
  useEffect(()=>{
    if(!state){
      navigate(-1)
    }
  },[state, navigate])
  return(
      <Formik
      initialValues={{
        password: "",
        password2: "",
      }}
      validationSchema={validationSchema}
      onSubmit={submit}
      validateOnMount={true}
    >
      {({ values, handleSubmit, handleChange, errors, isValid, dirty }) => (
        <div className="Login">
          <h2 className="Title">비밀번호 변경</h2>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="LoginInput">
              <label htmlFor="">비밀번호</label>
              <input
                type="password"
                name="password"
                className="Input"
                value={values.password}
                onChange={handleChange}
              />
              <div className="Message NT">
                {!values.password ? null : <p>{errors.password}</p>}
              </div>
            </div>
            <div className="LoginInput">
              <label htmlFor="">비밀번호 확인</label>
              <input
                type="password"
                name="password2"
                className="Input"
                value={values.password2}
                onChange={handleChange}
              />
              <div className="Message NT">
                {!values.password2 ? null : <p>{errors.password2}</p>}
              </div>
            </div>
            {!(isValid && dirty) ? (
              <div className="DisabledButton">비밀번호 변경</div>
            ) : (
              <button
                type="submit"
                className="FetchBtn"
                disabled={!(isValid && dirty)}
              >
                비밀번호 변경
              </button>
            )}
          </form>
        </div>
      )}
    </Formik>
  )
}

export default ChangePassword
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUser } from "../../services/userService";

const LawyerRegist = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("올바른 이메일 형식이 아닙니다!")
      .required("이메일을 입력하세요!"),
    phone: Yup.string()
      .matches(/^\d+$/, "숫자만 입력해주세요!")
      .required("전화번호를 입력해주세요!"),
    callNumber: Yup.string().matches(/^\d+$/, "숫자만 입력해주세요!"),
    registNumber: Yup.string()
      .matches(/^\d+$/, "숫자만 입력해주세요!")
      .required("전화번호를 입력해주세요!"),
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
    const { email, username, password, phone, callNumber, registNumber } =
      values;
    await createUser({
      email,
      username,
      password,
      phone,
      callNumber,
      registNumber,
    })
      .then(() => {
        toast.success(<h3>변호사 회원가입 신청이 완료되었습니다. 변호사 권한 심사는 영업일 기준 1~3일 정도 소요됩니다.</h3>, {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) =>
        toast.error(err.response.data.message + "😭", {
          position: "top-center",
        })
      );
  };
  return (
    <Formik
      initialValues={{
        email: "",
        username: "",
        phone: "",
        callNumber: "",
        registNumber: "",
        password: "",
        password2: "",
      }}
      validationSchema={validationSchema}
      onSubmit={submit}
      validateOnMount={true}
    >
      {({ values, handleSubmit, handleChange, errors, isValid, dirty }) => (
        <div className="Login">
          <ToastContainer />
          <h2 className="Title">회원가입</h2>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="LoginInput">
              <label htmlFor="">
                이메일 <span className="Red">*</span>
              </label>
              <input
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              <div className="Message">
                {!values.email ? null : <p>{errors.email}</p>}
              </div>
            </div>
            <div className="LoginInput">
              <label htmlFor="username">
                이름 <span className="Red">*</span>
              </label>
              <input
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
              />
              <div className="Message">
                {!values.username ? null : <p>{errors.username}</p>}
              </div>
            </div>
            <div className="LoginInput">
              <label htmlFor="phone">
                전화번호 <span className="Red">*</span>
              </label>
              <input
                type="text"
                name="phone"
                value={values.phone}
                onChange={handleChange}
              />
              <div className="Message">
                {!values.phone ? null : <p>{errors.phone}</p>}
              </div>
            </div>
            <div className="LoginInput">
              <label htmlFor="callNumber">사무실 전화번호</label>
              <input
                type="text"
                name="callNumber"
                value={values.callNumber}
                onChange={handleChange}
              />
              <div className="Message">
                {!values.callNumber ? null : <p>{errors.callNumber}</p>}
              </div>
            </div>
            <div className="LoginInput">
              <label htmlFor="registNumber">
                사업자 등록 번호 <span className="Red">*</span>
              </label>
              <input
                type="text"
                name="registNumber"
                value={values.registNumber}
                onChange={handleChange}
              />
              <div className="Message">
                {!values.registNumber ? null : <p>{errors.registNumber}</p>}
              </div>
            </div>
            <div className="LoginInput">
              <label htmlFor="">
                비밀번호 <span className="Red">*</span>
              </label>
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
              <label htmlFor="">
                비밀번호 확인 <span className="Red">*</span>
              </label>
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
              <div className="DisabledButton">회원가입</div>
            ) : (
              <button
                type="submit"
                className="FetchBtn"
                disabled={!(isValid && dirty)}
              >
                회원가입
              </button>
            )}
          </form>
        </div>
      )}
    </Formik>
  );
};
export default LawyerRegist;

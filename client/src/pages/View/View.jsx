import './View.css'
import iconcall from './../../components/images/iconcall.png'
import iconkey from './../../components/images/iconkey.png'

const View = ()=>{
return (
  <div className="View">
    <p className='Ball'></p>
    <h2>내 문의 조회하기</h2>
    <div>
   
    </div>
    <div className=' Phone_number'>
      <p><img src= { iconcall } alt="전화기아이콘" />전화번호</p>
      <input type="text" placeholder="전화번호를 입력해주세요." />
      <hr />
    </div>
    <div className=" Passwor">
      <p><img src= { iconkey } alt="비밀번호" />비밀번호</p>
      <input type="password" placeholder="비밀번호를 입력해주세요." />
      <hr />
    </div>
  
      <p className='Check_b'><button>조회하기</button></p>
    
        
  
  </div>
);
}
export default View
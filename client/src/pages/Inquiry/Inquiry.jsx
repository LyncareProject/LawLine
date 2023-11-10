import './Inquiry.css'
import iconcall from './../../components/images/iconcall.png'
import iconkey from './../../components/images/iconkey.png'

const Inquiry = ()=>{
return (
  <div className="Inquiry">
    <p className='Ball'></p>
    <h3>어려운 법률이야기 <br />
        혼자서 해결하기 힘드시죠?</h3>
    <h2>전문가가 도와드리겠습니다</h2>
    <div>
      <p className='Inquiry_b'><button>문의하기</button></p>
      <p className='Check_b'><button>조회하기</button></p>
    </div>
    <div className=' Phone_number'>
      <p><img src= { iconcall } alt="전화기아이콘" />전화번호</p>
      <input type="text" placeholder="전화번호를 입력해주세요." />
      <hr />
    </div>
    <div className=" Passwor">
      <p><img src= { iconkey } alt="비밀번호" />비밀번호</p>
      <input type="password" placeholder="비밀번호를 생성해주세요." />
      <hr />
    </div>
    <div className='Inquiry_details'>
      <h4>문의내용</h4>
      <textarea name="" id="" cols="30" rows="10">

      </textarea>
    </div>
    <p className='Apply_b'><button>접수하기</button></p>
        
  
  </div>
);
}
export default Inquiry
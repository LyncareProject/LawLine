import './Main.css'
import Group7 from './../../components/images/Group7.png'
import Group8 from './../../components/images/Group8.png'
import Group9 from './../../components/images/Group9.png'
import KO_MEMBER from './../../components/images/KO_MEMBER.png'
import { Link } from 'react-router-dom';


const Main = ()=>{
return (
  <div className="Main">
        <h3>어려운 법률이야기 <br />
            혼자서 해결하기 힘드시죠?</h3>
        <h2>전문가가 도와드리겠습니다</h2>
        <div className="section1">
          <div className='section1_size'>
            <div className='section_img'>
            <p><Link to="/Counsel"><img src= { Group7 } alt="상담하기" />상담하기</Link></p>
            <p><Link to="/View"><img src= { Group8 } alt="조회하기" />조회하기</Link></p>
             
            </div>
            <div className='ai'>
              <p><Link to="/Counsel"><img src= { Group9 } alt="간단한 질문도 AI도우미가 답변해드려요 beta" /></Link></p>
              <p className='ai_text'>간단한 질문도 AI도우미가 답변해드려요 <span>BETA</span></p>
              <p className='im'><img src= { KO_MEMBER } alt="임영준변호사사진" />임영준변호사사진</p>
            </div>
          </div>
        </div>
        <div className="section2">
         
          <h3><span>안녕하세요</span> <br />
               변호사 임영준입니다</h3>
          <ul>
            <li className='li_title'>변호사 약력</li>
            <li>현)법무법인 정곡 <span>서울사무소 대표변호사</span></li>
            <li>제 2017-168호 <span>이혼상속 등 전문분야 등록</span></li>
            <li>현)서울 양천구청 <span>법률고문 위촉</span></li>
            <li>현)서울특별시 <span>공익변호사단</span></li>
            <li>현)공정거래위원회 <span>가맹거래사</span></li>
            <li>현)충청북도 <span>마을변호사</span></li>
            <li>전)대법원 <span>국선변호인</span></li>
            <li>전)서울남부지방법원 <span>소송구조 지정변호사</span></li>
            <li>전)서울남부지방법원 <span>논스톱 국선 변호인</span></li>
            <li>전)대한가정법률복지상담원 <span>인천지부 법무이사</span></li>
            <li>전)인천지방법원  <span>국선변호인(성폭력 전담부)</span></li>
            <li>전)서울창업진흥원 <span>청년창업지원센터 법률자문위원</span></li>
            <li>전)온라인유통센터 <span>법률자문위원</span></li>
            <li className='li_last'>전)중앙해양심판원<span>해양사고조사심판변론인</span></li>
          </ul>
        </div>
  
  </div>
);
}
export default Main
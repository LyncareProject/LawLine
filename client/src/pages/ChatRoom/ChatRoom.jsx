import Text from '../../components/Text/Text'
import './ChatRoom.css'

const ChatRoom = ()=>{
  return(
    <div className="ChatRoom">
      <div className="ChatRoomHead">
        <Text 
        textAlign={"center"}
        fontSize={"24px"}
        fontWeight={700}
        fontColor={"#000"}
        text={"LawLine 상담 신청"}
        />
      </div>
      <div className="ChatRoomBody"></div>
      <div className="ChatRoomBottom"></div>
    </div>
  )
}
export default ChatRoom
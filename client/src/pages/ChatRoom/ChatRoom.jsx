import Text from '../../components/Text/Text'
import styles from './ChatRoom.module.css'

const ChatRoom = ()=>{
  return(
    <div className={styles.ChatRoom}>
      <div className={styles.ChatRoomBody}></div>
      <div className={styles.ChatRoomInput}>
        <input type="text" placeholder='메세지를 입력해주세요' />
        <button>전송</button>
      </div>
    </div>
  )
}
export default ChatRoom
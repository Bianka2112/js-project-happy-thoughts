import { useThoughtStore } from "../store/useThoughtStore"
import BackToTop from "../components/BackToTop"
import DeleteThought from "../components/DeleteButton"
import HeartsButton from "../components/HeartsButton"
import TimeStamp from "../components/TimeStamp"
import EditThoughtForm from "../components/EditTh-Form"
import { BoardDetails, CardContainer, MessageBoard } from "../components/Styled-Comps"

export const MsgBoard = () => {
  const thoughts = useThoughtStore(state => state.thoughts)

  return (
    <MessageBoard>
      {thoughts.map((t) => (
        <CardContainer key={t._id}>{t.message}
          <BoardDetails>
              <HeartsButton  hearts={t.hearts} id={t._id} />
              <TimeStamp timeSubmitted={t.createdAt} />
              <DeleteThought id={t._id} />
              <EditThoughtForm id={t._id} currentMessage={t.message}/>
          </BoardDetails>
        </CardContainer>
      ))}
      <BackToTop />
    </MessageBoard>
  )
}


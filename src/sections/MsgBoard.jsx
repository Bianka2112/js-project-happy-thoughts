import { useThoughtStore } from "../store/useThoughtStore"
import BackToTop from "../components/BackToTop"
import DeleteThought from "../components/DeleteButton"
import HeartsButton from "../components/HeartsButton"
import TimeStamp from "../components/TimeStamp"
import EditThoughtForm from "../components/EditTh-Form"
import { BoardDetails, CardContainer, MessageBoard } from "../components/Styled-Comps"
import { useAuthStore } from "../store/useAuthStore"
import { Typography } from "@mui/material"

export const MsgBoard = () => {
  const thoughts = useThoughtStore(state => state.thoughts)
  const userId = useAuthStore((state) => state.userId)
  
  
  return (
    <MessageBoard>
      {thoughts.map((t) => {
      const isOwner = t.createdBy && t.createdBy === userId
      return (
        <CardContainer key={t._id}>{t.message}
          <BoardDetails>
              <HeartsButton  hearts={t.hearts} id={t._id} />
              <TimeStamp timeSubmitted={t.createdAt} />
                {isOwner && (
                  <>
                <Typography variant="caption" color="primary">
                  ✨ Yours
                </Typography>
              <DeleteThought id={t._id} />
              <EditThoughtForm id={t._id} currentMessage={t.message}/>
                  </>
                )}
          </BoardDetails>
        </CardContainer>
      )
    })}
      <BackToTop />
    </MessageBoard>
  )
}


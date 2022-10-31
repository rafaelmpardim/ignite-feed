import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css'

type Author = {
  avatarUrl: string
  name: string
  role: string
}

type Content = {
  text: string
  type: string
  url?: string
}

interface PostProps {
  author: Author
  content: Content[]
  publishedAt: Date
}

interface CommentProps {
  content: string
}

export function Post({ author, content, publishedAt }: PostProps) {
  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", { locale: ptBR })
  const publishedRelativeToNow = formatDistanceToNow(publishedAt, {
    addSuffix: true,
    locale: ptBR
  })

  const [comments, setComments] = useState<CommentProps[]>([])
  const [newCommentText, setNewCommentText] = useState('')

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()

    setComments([...comments, {
      content: newCommentText
    }])

    setNewCommentText('')
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Este campo é obrigatório!')
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeleteOne = comments.filter(comment => {
      return comment.content !== commentToDelete
    })

    setComments([...commentsWithoutDeleteOne])
  }

  const isNewCommentEmpty = newCommentText.length == 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar
            src={author.avatarUrl}
          />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          dateTime={publishedAt.toISOString()}
          title={publishedDateFormatted}
        >
          {publishedRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {
          content.map(line => {
            if (line.type === 'paragraphy') {
              return <p key={line.text}>{line.text}</p>
            } else if (line.type === 'link') {
              return <p key={line.text}><a href={line.url}>{line.text}</a></p>
            }
          })
        }
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          placeholder="Escreva um comentário"
          required
          value={newCommentText}
        />

        <footer>
          <button
            type="submit"
            disabled={isNewCommentEmpty}
          >
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {
          comments.map(comment => {
            return (
              <Comment
                content={comment.content}
                onDeleteComment={deleteComment}
                key={comment.content}
              />
            )
          })
        }
      </div>
    </article>
  )
}
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Post } from "./components/Post";

import './global.css'
import styles from './App.module.css'


const posts = [
  {
    author: {
      avatarUrl: 'https://github.com/diego3g.png',
      name: 'Diego Fernandes',
      role: 'CTO at @Rocketseat'
    },
    content: [
      {type: 'paragraphy', text: 'Faaaaaaaala, Dev! Como é que vocês estão? 👋🏽'},
      {type: 'link', text: 'github.com/diego3g', url: 'https://github.com/diego3g'}
    ],
    id: 2,
    publishedAt: new Date('2022-10-29 18:00:00')
  },
  {
    author: {
      avatarUrl: 'https://github.com/maykbrito.png',
      name: 'Mayk Brito',
      role: 'Educator at @Rocketseat'
    },
    content: [
      {type: 'paragraphy', text: 'Fala, Dev! Mayk Brito na área! 👋🏽'},
      {type: 'link', text: 'github.com/maykbrito', url: 'https://github.com/maykbrito'}
    ],
    id: 3,
    publishedAt: new Date('2022-10-15 15:00:00')
  }
]

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />

        <main>
          {
            posts.map(post => {
              return (
                <Post
                  author={post.author}
                  content={post.content}
                  key={post.id}
                  publishedAt={post.publishedAt}
                />
              )
            })
          }
        </main>
      </div>
    </div>
  )
}
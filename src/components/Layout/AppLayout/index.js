import styles from './styles'

export default function AppLayout ({ children }) {
  return (
    <>
      <div>
        <main>{children}</main>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

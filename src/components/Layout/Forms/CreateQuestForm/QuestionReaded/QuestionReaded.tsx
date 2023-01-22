import styles from './QuestionReaded.module.css'
export default function QuestionReaded ({ question }: any) {
  const { title, solution, answers } = question
  return (
    <>
      <div className={styles.questionBox}>
        <p className={styles.title}>{title}</p>
        <div>
          <p>Answers:</p>

          <div className={styles.answers}>
            {answers.map((answer: string, index: number) => {
              return (
                <div className={styles.answer} key={`${index}-${answer}`}>
                  <p
                    className={`${styles.answer}${
                      solution === answers[0]
                        ? styles.correct
                        : styles.noCorrect
                    }`}
                  >
                    {answer}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.solutionContainer}>
          <p>Solution:</p>
          <p className={styles.solutionText}>{solution}</p>
        </div>
      </div>
    </>
  )
}

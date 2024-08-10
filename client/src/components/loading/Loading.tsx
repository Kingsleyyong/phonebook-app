import styles from '@/styles/loading.module.sass';

const {loadingBox, loadingSpinner, typingText} = styles

const Loading = () => {
      return (
            <div className={loadingBox}>
                  <span className={loadingSpinner} />
                  <span className={typingText}>Phonebook Application</span>
            </div>
      )
}

export default Loading

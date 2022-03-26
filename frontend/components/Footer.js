import footerStyles from '../styles/Footer.module.css'
import NewPostButton from './Button/NewPostButton'

const Footer = ({ children }) => {
  return (
    <div className={footerStyles.footer}>
      <NewPostButton />
    </div>
  )
}

export default Footer
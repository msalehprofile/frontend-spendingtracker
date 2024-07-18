import './Header.scss';

type HeaderProps = {
  brandName: string;
}

const Header = ({brandName}: HeaderProps) => {
  return (
    <div className="header">
        <h2 className="header__brand-name">juniper</h2>
    </div>
  )
}

export default Header
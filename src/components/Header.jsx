import imgLogo from '../assets/logo.jpg';

export default function Header () {
  return (
    <header id="main-header">
      <div id="title">
        <img src={imgLogo} alt="Food logo"/>
        <h1>React food</h1>
      </div>
      <button>Cart (0)</button>
    </header>
  );
}

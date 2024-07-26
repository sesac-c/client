const Header = () => (
    <h1 className="header">안녕~?</h1>
);

const Mascot = () => (
    <img src="path_to_mascot_image.png" alt="Mascot" className="mascot" />
);

const LoginForm = () => (
    <form className="login-form">
        <h2>새싹커뮤니티</h2>
        <input type="text" placeholder="아이디" />
        <input type="password" placeholder="비밀번호" />
        <div className="form-links">
            <a href="#">회원가입</a> | <a href="#">비밀번호 찾기</a>
        </div>
        <button type="submit" className="login-button">로그인</button>
    </form>
);

const LoginPage = () => {
    return (
        <div className="login-page">
            <Header />
            <Mascot />
            <LoginForm />
        </div>
    )
};

export default LoginPage;
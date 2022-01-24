import Directory from '../../component/directory/directory.component';
import './homepage.style.scss';
import { HomePageContainer } from "./homepage.styles";

const HomePage = () => (
    <HomePageContainer>
        <Directory />
    </HomePageContainer>
);

export default HomePage;
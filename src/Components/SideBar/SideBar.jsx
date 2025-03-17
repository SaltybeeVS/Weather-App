import './SideBar.modules.css';
import Card from '../Common/Card/Card';
import { FaLinkedin, FaGithub, FaHome } from "react-icons/fa";


function SideBar(){
    return(
        <>
            <Card className={"sideBar"}>
                <h1>VS</h1>
                <section className='Bottom'>
                    <ul>
                        <li><a target="_blank" href="https://www.linkedin.com/in/vicente-sandoval-carrasco/"><FaLinkedin className='SidebarIcon'/></a></li>
                        <li><a target="_blank" href="https://github.com/SaltybeeVS"><FaGithub className='SidebarIcon'/></a></li>
                        <li><a target="_blank" href="https://saltybeevs.github.io/Portfolio/"><FaHome className='SidebarIcon'/></a></li>
                    </ul>    
                </section>  
            </Card>
        </>
    );
}

export default SideBar;
import './SideBar.modules.css';
import Card from '../Common/Card/Card';
import { FaLinkedin, FaGithub, FaHome } from "react-icons/fa";

/**
 * SideBar component displaying social media links
 * @returns {JSX.Element} Vertical sidebar with icon links
 */
function SideBar() {
    return (
        <Card className="sideBar">
            {/* Branding/Logo section */}
            <h1>VS</h1>
            
            {/* Social media links section */}
            <section className='Bottom'>
                <ul>
                    <li>
                        <a target="_blank" rel="noopener noreferrer" 
                          href="https://www.linkedin.com/in/vicente-sandoval-carrasco/">
                            <FaLinkedin className='SidebarIcon' />
                        </a>
                    </li>
                    <li>
                        <a target="_blank" rel="noopener noreferrer" 
                          href="https://github.com/SaltybeeVS">
                            <FaGithub className='SidebarIcon' />
                        </a>
                    </li>
                    <li>
                        <a target="_blank" rel="noopener noreferrer" 
                          href="https://saltybeevs.github.io/Portfolio/">
                            <FaHome className='SidebarIcon' />
                        </a>
                    </li>
                </ul>
            </section>
        </Card>
    );
}

export default SideBar;
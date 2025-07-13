import ButtonExample from '../common/ui/Button/Button.example';
import ExampleComponent from '../../styles/example-usage';
import Typography from '../../styles/Typography';
import { Button } from '../common/ui';
import IconButtonExample from '../common/ui/IconButton/IconButton.example';
import InputExample from '../common/ui/Input/Input.example';
import SelectExample from '../common/ui/Select/Select.example';
import MainTitleExample from '../common/ui/MainTitle/MainTitle.example';
import PathInfoExample from '../common/ui/PathInfo/PathInfo.example';
import SubtitleExample from '../common/ui/Subtitle/Subtitle.example';
import ModalExample from '../common/ui/Modal/Modal.example';

const UIExamplesPage = () => {
    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}>
                UI Components Examples
            </h1>

            {/* Button Examples */}
            <section style={{ marginBottom: '60px' }}>
                <h2
                    style={{
                        marginBottom: '20px',
                        color: '#333',
                        borderBottom: '2px solid #eee',
                        paddingBottom: '10px',
                    }}>
                    Buttons
                </h2>
                <div style={{ marginBottom: '20px' }}>
                    <Button variant='primary' size='large' disabled>
                        Primary Button
                    </Button>
                    <Button variant='white' size='large'>
                        White Button
                    </Button>
                </div>
                <ButtonExample />
            </section>

            {/* Icon Buttons */}
            <section style={{ marginBottom: '60px' }}>
                <h2
                    style={{
                        marginBottom: '20px',
                        color: '#333',
                        borderBottom: '2px solid #eee',
                        paddingBottom: '10px',
                    }}>
                    Icon Buttons
                </h2>
                <IconButtonExample />
            </section>

            {/* Input Fields */}
            <section style={{ marginBottom: '60px' }}>
                <h2
                    style={{
                        marginBottom: '20px',
                        color: '#333',
                        borderBottom: '2px solid #eee',
                        paddingBottom: '10px',
                    }}>
                    Input Fields
                </h2>
                <InputExample />
            </section>

            {/* Select Dropdown */}
            <section style={{ marginBottom: '60px' }}>
                <h2
                    style={{
                        marginBottom: '20px',
                        color: '#333',
                        borderBottom: '2px solid #eee',
                        paddingBottom: '10px',
                    }}>
                    Select Dropdown
                </h2>
                <SelectExample />
            </section>

            {/* Typography */}
            <section style={{ marginBottom: '60px' }}>
                <h2
                    style={{
                        marginBottom: '20px',
                        color: '#333',
                        borderBottom: '2px solid #eee',
                        paddingBottom: '10px',
                    }}>
                    Typography
                </h2>
                <MainTitleExample />
                <div style={{ marginTop: '40px' }}>
                    <SubtitleExample />
                </div>
                <div style={{ marginTop: '40px' }}>
                    <Typography />
                </div>
            </section>

            {/* Navigation */}
            <section style={{ marginBottom: '60px' }}>
                <h2
                    style={{
                        marginBottom: '20px',
                        color: '#333',
                        borderBottom: '2px solid #eee',
                        paddingBottom: '10px',
                    }}>
                    Navigation
                </h2>
                <PathInfoExample />
            </section>

            {/* Modal */}
            <section style={{ marginBottom: '60px' }}>
                <h2
                    style={{
                        marginBottom: '20px',
                        color: '#333',
                        borderBottom: '2px solid #eee',
                        paddingBottom: '10px',
                    }}>
                    Modal Windows
                </h2>
                <ModalExample />
            </section>

            {/* CSS Variables Example */}
            <section style={{ marginBottom: '60px' }}>
                <h2
                    style={{
                        marginBottom: '20px',
                        color: '#333',
                        borderBottom: '2px solid #eee',
                        paddingBottom: '10px',
                    }}>
                    CSS Variables
                </h2>
                <ExampleComponent />
            </section>
        </div>
    );
};

export default UIExamplesPage;

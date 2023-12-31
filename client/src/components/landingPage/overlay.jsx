import * as Components from '../components';

const Overlay = ({ signIn, toggle }) => {
    return (
        <Components.OverlayContainer signingIn={signIn}>
            <Components.Overlay signingIn={signIn}>
                <Components.LeftOverlayPanel signingIn={signIn}>
                    <Components.Title>Ready to crush your fitness goals?</Components.Title>
                    <Components.Paragraph>Log in and let the journey start!</Components.Paragraph>
                    <Components.LandingPageButton onClick={() => toggle(true)}>Sign In</Components.LandingPageButton>
                </Components.LeftOverlayPanel>
                <Components.RightOverlayPanel signingIn={signIn}>
                    <Components.Title>Hey there!</Components.Title>
                    <Components.Paragraph>
                        Sign up an account and start your journey with us
                    </Components.Paragraph>
                    <Components.LandingPageButton onClick={() => toggle(false)}>Sign Up</Components.LandingPageButton>
                </Components.RightOverlayPanel>
            </Components.Overlay>
        </Components.OverlayContainer>
    );
};

export default Overlay;
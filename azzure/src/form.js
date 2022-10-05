import Form from 'react-bootstrap/Form';

function UploadForm(props) {
    return (
        <Form>
            <Form.Control type='file' />
        </Form>
    );
}

function Switch(props) {
    return (
        <Form.Check
            type="switch"
            id="custom-switch"
            label="Custom switch"
        />
    );
}

export default UploadForm;
export { Switch };
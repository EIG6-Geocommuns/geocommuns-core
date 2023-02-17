import { Alert } from "@codegouvfr/react-dsfr/Alert";

export type MyComponentProps = {
    className?: string;
};

export function MyComponent(props: MyComponentProps) {
    const { className } = props;

    return (
        <Alert
            className={className}
            closable
            description="Everything went well !!! ok"
            severity="success"
            title="Super !!!!!  <3"
        />
    );
}

export default MyComponent;

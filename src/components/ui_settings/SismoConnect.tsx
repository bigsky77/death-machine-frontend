import {
  AuthType,
  SismoConnectButton,
  SismoConnectClientConfig,
  SismoConnectResponse,
} from "@sismo-core/sismo-connect-react";
import axios from "axios";
import { useState, useEffect } from "react";

export const sismoConnectConfig: SismoConnectClientConfig = {
  appId: "0x97f25a024703a13d6cf18b84639e4c02",
  devMode: {
    enabled: false,
  }
};

export default function SismoConnect({handleWelcomeClose}) {
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  const verify = async (response: SismoConnectResponse) => {
    setVerifying(true);
    try {
        await axios.post(`/api/subscribe`, {
            response,
        })
        setIsVerified(true);
    } catch (e) {
        setError("Invalid response")
        console.error(e);
    } finally {
        setVerifying(false);
    }
  }

  useEffect(() => {
    if (isVerified) {
        handleWelcomeClose();
    }
  }, [isVerified]);

  return (
        <div>
                <SismoConnectButton
                    config={sismoConnectConfig}
                    auths={[{authType:AuthType.VAULT}]}
                    onResponse={(response: SismoConnectResponse) => verify(response)}
                    verifying={verifying}
                    //callbackPath={'/src/components/ui_settings/SismoConnect'}
                    overrideStyle={{marginBottom: 10}}
                />
      </div>
  );
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { DataRequest, ZkConnect, ZkConnectServerConfig, AuthType } from '@sismo-core/zk-connect-server';
import type { NextApiRequest, NextApiResponse } from 'next'

enum Status {
  NotSubscribed = "not-subscribed",
  Success = "success",
  Error = "error",
  AlreadySubscribed = "already-subscribed"
}

type Data = {
  status: Status,
  userId?: string,
  email?: string,
  message?: string
}

const zkConnectConfig: ZkConnectServerConfig = {
  appId: "0x97f25a024703a13d6cf18b84639e4c02",
  devMode: {
    enabled: false,//process.env.NEXT_PUBLIC_ENV_NAME === "LOCAL",
  }
}

const zkConnect = ZkConnect(zkConnectConfig);

const claimRequest = {
  groupId: "0xd4c26c7339106996298c53eaab7a2d59",
};

const authRequest = {
  authType: AuthType.ANON,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const { zkConnectResponse } = req.body;

  try {
    const { verifiedAuths } = await zkConnect.verify(zkConnectResponse, {
      authRequest,
      claimRequest,
    });
    const userId =  verifiedAuths[0].userId;
    res.status(200).json({ status: Status.Success, userId });
  } catch (error) {
    res.status(500).json({ status: Status.Error, message: "error" });
  }
}

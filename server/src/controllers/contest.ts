import { apiConnector } from '../util/apiConnector.js';
import { CLIST_USERNAME, CLIST_API_KEY } from '../config/env.js';
import { Request, Response } from 'express';

export const upcomingContest = async (req: Request, res: Response) => {
  try {
    const response = await apiConnector(
      'GET',
      'https://clist.by/api/v4/contest/',
      null,
      {
        Authorization: `ApiKey ${CLIST_USERNAME}:${CLIST_API_KEY}`,
      },
      {}
    );
    return res.status(200).json({
      success: true,
      data: response.data.objects,
    });
  } catch (error) {
    console.error(error);
  }
};

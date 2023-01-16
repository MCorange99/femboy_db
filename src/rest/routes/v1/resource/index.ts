import { ApiError } from "../../../../utils";
import express from "express";
const router = express.Router();

const callback_data = new Map();
type cb_type = {
    data: string,
    ip: string,
    created_at: number,
    onetime: boolean,
    expire_in: number,
    same_ip: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function addResource(id: string, data: string, req: any, expire_in: number, onetime = true, require_same_ip = true) {
    const ip =
            req.headers["cf-connecting-ip"] ||
            req.headers["x-real-ip"] ||
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress || "";
    callback_data.set(id, {
        data: data,
        ip: ip,
        created_at: Date.now(),
        onetime: onetime,
        expire_in: expire_in,
        same_ip: require_same_ip
    });
}

router.get("/:rid", async (req, res) => {
    const ip =
            req.headers["cf-connecting-ip"] ||
            req.headers["x-real-ip"] ||
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress || "";

    const rid = req.params.rid;

    const resource: cb_type = callback_data.get(rid);
    if (!resource || resource === null || (resource.created_at - Date.now() > 1000*resource.expire_in)) {
        return ApiError.ResourceMissing(res);
    }

    if (ip !== resource.ip && resource.same_ip) {
        return res.status(403).json({
            code: "Forbidden",
            status: 403,
            message: "Request ip`s do not match"
        });
    }

    res.status(200).json(JSON.parse(resource.data));
    if (resource.onetime) callback_data.delete(rid);
});

export default router;
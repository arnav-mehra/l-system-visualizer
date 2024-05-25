import React, { useState } from 'react';
import { Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const useMag = () => {
    const [mag, setMag] = useState(10);

    const incMag = () => {
        setMag(mag + 2);
    };

    const decMag = () => {
        setMag(mag == 2 ? 2 : mag - 2);
    };

    const MagCtrls = () => (
        <div
            className="flex-row"
            style={{ alignItems: "center", justifyContent: "space-between" }}
        >
            <div className="text">
                Mag
            </div>

            <Button
                onClick={decMag}
                icon={<MinusOutlined />}
                size="small"
                shape="circle"
            />
            <Button
                onClick={incMag}
                icon={<PlusOutlined />}
                size="small"
                shape="circle"
            />
        </div>
    );

    return {
        mag,
        setMag,
        MagCtrls
    };
};

export default useMag;
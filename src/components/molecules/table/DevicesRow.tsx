import React, { useState, useEffect } from 'react';
import { SvgIcon } from '@mui/material';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

interface DevicesRowProps {
  i: number;
  pageIndex?: number;
  content: {
    deviceId: number;
    companyName?: string;
    taxId?: string;
    deviceAlias: string;
    type: string;
    ip: string;
    port: number;
    sid: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

const DevicesRow = ({ i, pageIndex, content }: DevicesRowProps) => {
  const [rowData, setRowData] = useState(content);

  useEffect(() => {
    setRowData(content);
  }, [content]);

  return (
    <tr className="table__row">
      <td className="table__data">
        {pageIndex && (pageIndex - 1) * 10 + i + 1}
      </td>
      {rowData.companyName && (
        <td className="table__data">
          {rowData.companyName}
          <br />({rowData.taxId})
        </td>
      )}
      <td className="table__data">{rowData.deviceAlias}</td>
      <td className="table__data">{rowData.type}</td>
      <td className="table__data">{rowData.ip}</td>
      <td className="table__data">{rowData.port}</td>
      <td className="table__data">{rowData.sid}</td>
      <td className="table__data">
        {rowData.status ? (
          <SvgIcon
            className="devices__info--success"
            component={CheckCircleOutlineOutlinedIcon}
            inheritViewBox
          />
        ) : (
          <SvgIcon
            className="devices__info--fail"
            component={CancelOutlinedIcon}
            inheritViewBox
          />
        )}
      </td>
      <td className="table__data">
        {rowData.createdAt.replace('T', '\n').split('.')[0]}
      </td>
      <td className="table__data">
        {rowData.updatedAt.replace('T', '\n').split('.')[0]}
      </td>
    </tr>
  );
};

export default DevicesRow;

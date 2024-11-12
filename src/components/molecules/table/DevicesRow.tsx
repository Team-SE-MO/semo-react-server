import React, { useState, useEffect } from 'react';
import Button from 'components/atoms/button/Button';
import { SvgIcon } from '@mui/material';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DatabaseForm from 'components/organisms/modal/DatabaseForm';
import DatabaseDelete from 'components/organisms/modal/DatabaseDelete';

interface DevicesRowProps {
  i: number;
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

const DevicesRow = ({ i, content }: DevicesRowProps) => {
  const [rowData, setRowData] = useState(content);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeviceEdit = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDeviceDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    setRowData(content);
  }, [content]);

  // TODO: 차후 api 연결시, 응답 데이터로 변경 필요
  const editData = {
    databaseAlias: 'LOCALHOST',
    type: 'ORACLE',
    ip: '127.0.0.1',
    port: 1521,
    sid: 'XE',
    username: 'semoDB',
    password: 'semodb123',
  };

  return (
    <tr>
      <td className="table__row">{i + 1}</td>
      {rowData.companyName && (
        <td className="table__row">
          {rowData.companyName}
          <br />({rowData.taxId})
        </td>
      )}
      <td className="table__row">{rowData.deviceAlias}</td>
      <td className="table__row">{rowData.type}</td>
      <td className="table__row">{rowData.ip}</td>
      <td className="table__row">{rowData.port}</td>
      <td className="table__row">{rowData.sid}</td>
      <td className="table__row">
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
      <td className="table__row">{rowData.createdAt}</td>
      <td className="table__row">{rowData.updatedAt}</td>
      <td className="table__row">
        <div className="table__btn">
          {/* TODO: api 연결 필요 */}
          <Button
            size="small"
            label="수정"
            color="other"
            radius="oval"
            type="button"
            onClick={handleDeviceEdit}
          />
          <DatabaseForm
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            mode="edit"
            editData={editData}
          />
          <Button
            size="small"
            label="삭제"
            color="danger"
            radius="oval"
            type="button"
            onClick={handleDeviceDelete}
          />
          <DatabaseDelete
            isOpen={isDeleteModalOpen}
            onClose={closeDeleteModal}
          />
        </div>
      </td>
    </tr>
  );
};

export default DevicesRow;

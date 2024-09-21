import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const { allAppliedJobs = [] } = useSelector((store) => store.job);

    return (
        <div>
            <Table>
                <TableCaption>Danh sách công việc bạn đã apply</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Thời gian</TableHead>
                        <TableHead>Vị trí</TableHead>
                        <TableHead>Tên công ty</TableHead>
                        <TableHead>Trạng thái</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4}>Chưa có apply công việc nào</TableCell>
                        </TableRow>
                    ) : (
                        allAppliedJobs.map((item, index) => {
                            const date = new Date(item?.applicant?.createdAt).toISOString().split('T')[0];
                            return (
                                <TableRow key={index}>
                                    <TableCell>{date}</TableCell>
                                    <TableCell>{item?.job?.title}</TableCell>
                                    <TableCell>{item?.job?.company?.name}</TableCell>
                                    <TableCell>
                                        <Badge className={`${item?.status == 'rejected' ? 'bg-red-400 hover:bg-red-500' : item?.status === 'pending' ? 'bg-gray-400 hover:bg-gray-500' : 'bg-green-400 hover:bg-green-500'}`}>{item?.status}</Badge>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AppliedJobTable;
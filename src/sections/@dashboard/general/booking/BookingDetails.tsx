import { useState } from 'react';
import { format } from 'date-fns';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Stack,
  Table,
  Avatar,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  CardProps,
  CardHeader,
  Typography,
  TableContainer,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from '@mui/material';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import { TableMoreMenu, TableHeadCustom } from '../../../../components/table';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

type RowProps = {
  id: string;
  name: string;
  avatar: string;
  checkIn: Date | string | number;
  checkOut: Date | string | number;
  phoneNumber: string;
  status: string;
  roomType: string;
  ip: string;
  hostName: string;
  infomation: any;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableLabels: any;
  tableData: any;
}

export default function BookingDetails({
  title,
  subheader,
  tableLabels,
  tableData,
  ...other
}: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row: any) => (
                <BookingDetailsRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type BookingDetailsRowProps = {
  row: RowProps;
};

function BookingDetailsRow({ row }: BookingDetailsRowProps) {
  const theme = useTheme();
  const router = useRouter();
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const [openAssignDialog, setOpenAssignDialog] = useState(false); // State for dialog

  const isLight = theme.palette.mode === 'light';

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleAssignUser = () => {
    setOpenAssignDialog(true); // Open dialog when "Assign User" is clicked
    handleCloseMenu(); // Close the menu
  };

  const handleCloseAssignDialog = () => {
    setOpenAssignDialog(false); // Close the dialog
  };

  const [selectedUserId, setSelectedUserId] = useState<string>('');

  const handleChangeUser = (event: any) => {
    setSelectedUserId(event.target.value);
  };

  const userList = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com' },
    { id: '3', name: 'Charlie Brown', email: 'charlie@example.com' },
    { id: '4', name: 'David Lee', email: 'david@example.com' },
  ];
  
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  
  const handleChangeUsers = (event: any) => {
    const {
      target: { value },
    } = event;
    setSelectedUserIds(typeof value === 'string' ? value.split(',') : value);
  };
  
  const handleAssign = () => {
    const assignedUsers = userList.filter((u) => selectedUserIds.includes(u.id));
    console.log(`Assigned users to ${row.id}:`, assignedUsers);
    setOpenAssignDialog(false);
    setSelectedUserIds([]);
  };

  const handleClickDetail = () => {
    router.push('/dashboard/server/list/');
    handleCloseMenu();
  };

  return (
    <>
      <TableRow>
        <TableCell>{row.id}</TableCell>
        <TableCell>
          <Typography variant="subtitle2">{row.hostName}</Typography>
          <Typography variant="subtitle2">{row.ip}</Typography>
        </TableCell>

        <TableCell>
          {row.infomation.map((spec: any, index: any) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Iconify icon={spec.icon} style={{ color: '#3B82F6', width: 20, height: 20 }} />
              <span>{spec.label}</span>
            </div>
          ))}
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={row.name} src={row.avatar} />
            <Typography variant="subtitle2">{row.name}</Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Label
            variant={isLight ? 'ghost' : 'filled'}
            color={
              (row.status === 'Running' && 'success') ||
              (row.status === 'Pending' && 'warning') ||
              (row.status === 'Rebooting' && 'primary') ||
              'error'
            }
          >
            {sentenceCase(row.status)}
          </Label>
        </TableCell>

        <TableCell align="right">
          <TableMoreMenu
            open={openMenu}
            onOpen={handleOpenMenu}
            onClose={handleCloseMenu}
            actions={
              <>
                <MenuItem onClick={handleClickDetail}>
                  <Iconify icon={'mdi:account'} /> Detail
                </MenuItem>
                <MenuItem onClick={handleAssignUser}>
                  <Iconify icon={'mdi:account'} /> Assign User
                </MenuItem>
                <MenuItem onClick={handleCloseMenu}>Delete</MenuItem>
              </>
            }
          />
        </TableCell>
      </TableRow>

      {/* Dialog for assigning user */}
      <Dialog open={openAssignDialog} onClose={handleCloseAssignDialog} maxWidth="md" fullWidth>
        <DialogTitle>Assign Users</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel id="select-multiple-users-label">Select Users</InputLabel>
            <Select
              labelId="select-multiple-users-label"
              multiple
              value={selectedUserIds}
              onChange={handleChangeUsers}
              input={<OutlinedInput label="Select Users" />}
              renderValue={(selected) =>
                userList
                  .filter((user) => selected.includes(user.id))
                  .map((user) => user.name)
                  .join(', ')
              }
            >
              {userList.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  <Checkbox checked={selectedUserIds.indexOf(user.id) > -1} />
                  <ListItemText primary={`${user.name} — ${user.email}`} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAssignDialog} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleAssign} color="primary" disabled={selectedUserIds.length === 0}>
            Assign
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
}

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// _mock_
import { _bookings, _bookingNew, _bookingsOverview, _bookingReview } from '../../../_mock';
// components
import Page from '../../../components/Page';
// sections
import {
  BookingDetails,
  BookingBookedRoom,
  BookingTotalIncomes,
  BookingRoomAvailable,
  BookingNewestBooking,
  BookingWidgetSummary,
  BookingCheckInWidgets,
  BookingCustomerReviews,
  BookingReservationStats,
} from '../../../sections/@dashboard/general/booking';
// assets
import { BookingIllustration, CheckInIllustration, CheckOutIllustration } from '../../../assets';

// ----------------------------------------------------------------------

GeneralBooking.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------
export default function GeneralBooking() {
  const theme = useTheme();

  const { themeStretch } = useSettings();

  return (
    <Page title="General: Banking">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} md={4}>
            <BookingWidgetSummary
              title="Total Booking"
              total={714000}
              icon={<BookingIllustration />}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingWidgetSummary title="Check In" total={311000} icon={<CheckInIllustration />} />
          </Grid> */}

          <Grid item xs={12}>
            <BookingDetails
              title="List Server"
              tableData={_bookings}
              tableLabels={[
                { id: 'id', label: 'ID' },
                { id: 'booker', label: 'Hostname' },
                { id: 'checkIn', label: 'Information' },
                { id: 'checkOut', label: 'User' },
                { id: 'status', label: 'Status' },
                { id: '' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

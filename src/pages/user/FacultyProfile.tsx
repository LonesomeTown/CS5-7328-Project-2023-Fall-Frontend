import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Avatar, Box, Input, TextField, Paper, Grid } from '@mui/material';
import FacultyJobService from '../../services/faculty-job';
import { Link } from 'react-router-dom';
interface Job {
    id: number;
    title: string;
    courseId: number;
    courseSchedule: string;
    totalHoursPerWeek: number;
    maxNumberOfTAs: number;
    requiredCourses: string;
    requiredSkills: string;
    TAStats: string;
    notes: string;
    deadlineToApply: string;
    facultyId: number;
}


const FacultyProfile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [resume, setResume] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]); // Assuming jobs have properties like id, title, description, date, etc.
  useEffect(()=>{
    FacultyJobService.getJobs()
      .then((data) => {
        console.log('Jobs data:', data);
        setJobs(data.slice(0,3));
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
      });
  },[]);
  
  // Function to open the file upload dialog when the "Upload Profile" button is clicked
  function handleUploadClick() {
    document.getElementById('profileUpload')?.click();
  }

  // Function to handle the change of the profile image file
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const uploadedImage = e.target?.result as string;
        setProfileImage(uploadedImage);
      };
      reader.readAsDataURL(file);
    }
  }

  // Function to handle the change of the resume file
  function handleResumeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const uploadedResume = e.target?.result as string;
        setResume(uploadedResume);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#1976D2', // Blue color
          color: '#FFF', // White color
          padding: '16px', // Adjust the padding as needed
        }}
      >
        My Faculty Dashboard
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography component="h1" variant="h5">
              Faculty Profile
            </Typography>
            <Avatar
              sx={{ width: 200, height: 200, mt: 3 }}
              alt="User Profile"
              src={profileImage || undefined}
            />
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button variant="contained" color="primary" sx={{ width: '100%'}} onClick={handleUploadClick}>
                    Upload Profile
                  </Button>
                  <Input type="file" id="profileUpload" sx={{ display: 'none' }} onChange={handleFileChange} />
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" color="primary" sx={{ width: '100%'}} onClick={() => document.getElementById('resumeUpload')?.click()}>
                    Upload Resume
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ mt: 4 }}>
              <form>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Department"
                  variant="outlined"
                  fullWidth
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Input type="file" id="resumeUpload" sx={{ display: 'none' }} onChange={handleResumeChange} />
                {resume && (
                  <a href={resume} target="_blank" rel="noopener noreferrer">
                    View Resume
                  </a>
                )}
              </form>
              <Box sx={{ mt: 2, display: 'column', justifyContent: 'center' }}>
                <Button variant="contained" color="primary" sx={{ width: '100%' }} onClick={handleSave}>
                  Save
                </Button>
                <Button
                  component={Link}
                  to="/jobs"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '8px', width: '100%', textAlign: 'center' }}
                >
                  View All Jobs
                </Button>
              </Box>
            </Box>
            {name && department && (
              <Paper elevation={3} sx={{ padding: 2, mt: 2, maxWidth: '80%' }}>
                <Typography variant="h6">User Information</Typography>
                <Typography>Name: {name}</Typography>
                <Typography>Department: {department}</Typography>
              </Paper>
            )}
          </Box>
        </Grid>







        <Grid item xs={6}>
          {/* Right section with Job Boxes using Box components */}
          {/* These boxes should be active applications or open positions that you've filled*/}
          <Box sx={{ mt: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {jobs.map((job) => (
              <Paper key={job.id} elevation={3} sx={{ spacing: 2, padding: 2, mb: 2, width: '100%' }}>
                <Typography variant="h6">{job.title}</Typography>
                <Typography>{job.notes}</Typography>
                <Typography>Date Submitted: {job.deadlineToApply}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: '10px' }}
                  onClick={() => handleCheckApplicants(job.id)}
                >
                  Check Applicants
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleEditPosting(job.id)}
                >
                  Edit Posting
                </Button>
              </Paper>
            ))}
          </Box>

        </Grid>

        

















        
      </Grid>
    </Container>
  );

  function handleSave() {
    // Handle saving the user's information
  }

  function handleCheckApplicants(jobId: number) {
    // Handle checking applicants for the specified job ID
    console.log(`Checking applicants for job ${jobId}`);
  }

  function handleEditPosting(jobId: number) {
    // Handle editing the posting for the specified job ID
    console.log(`Editing posting for job ${jobId}`);
  }

};

export default FacultyProfile;

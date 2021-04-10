import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { createAndAddItemsToPlaylistService } from '../services/playlistService';
import { resetButton } from './mixins';
import { Typography } from './Typography';
import toast from 'toastr';

const FormContainer = styled.div`
  max-width: 510px;

  @media (max-width: 1000px) {
    max-width: 300px;
  }

  form {
    .formContent {
      width: 100%;
      height: 100%;
      padding: 40px 20px;
      box-shadow: -4px 0px 8px rgba(16, 0, 59, 0.1);
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      border-radius: 6px;

      .textArea {
        margin-top: 15px;
        width: 100%;
        display: flex;
        flex-direction: column;

        input {
          padding: 15px;
        }

        textArea {
          padding: 20px 32px 15px 20px;
        }
      }

      .buttonWrapper {
        align-self: flex-end;
        justify-content: flex-end;
        display: flex;
        margin-top: 20px;

        button {
          ${resetButton}
          background-color: ${(p) => p.theme.resolved.colors.accentColor};
          padding: 10px 20px;
          color: ${(p) => p.theme.resolved.text.colors.secondary600};
          border-radius: 4px;

          :hover {
            background-color: ${(p) =>
              p.theme.resolved.text.colors.secondary600};
            color: ${(p) => p.theme.resolved.colors.bgAccentColor};
          }
        }
      }
    }
  }
`;

const ExportForm = ({ onClose }: { onClose: VoidFunction }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [formErrors, setFormErrors] = useState({ name: '', description: '' });
  const items = useSelector((state) => Object.keys(state.library.tracks));
  const userId = useSelector((state) => state.user.userData?.id!);
  const exportForm = useMutation(
    (data: { name: string; description: string }) =>
      createAndAddItemsToPlaylistService(
        userId,
        data.name,
        data.description,
        items
      ),
    {
      onError: () => {
        // handle errors properly
        toast.error('Export failed');
      },
    }
  );

  const validateForm = () => {
    const errors = { ...formErrors };

    if (name.length < 2) {
      errors.name = 'Name must contain at least 2 characters';
    }
    if (description.length < 2) {
      errors.description = 'Description must contain at least 2 characters';
    }

    setFormErrors(errors);

    return !errors.name && !errors.description;
  };

  const submitForm = () => {
    const isValid = validateForm();

    if (!isValid) return;

    // submit
    exportForm.mutate({ name, description });
    onClose();
  };

  // reset errors
  useEffect(() => {
    if (formErrors.description || formErrors.name) {
      setFormErrors({ name: '', description: '' });
    }
  }, [formErrors, name, description]);

  return (
    <FormContainer>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          submitForm();
        }}
      >
        <div className="formContent">
          <Typography
            textStyle="sm18"
            textColor="primary"
            textTheme={{ weight: 600 }}
          >
            Export to Spotify
          </Typography>
          <Typography textStyle="sm12" textColor="primary400">
            Create a new playlist with tracks saved in your library
          </Typography>
          <div className="textArea">
            <Typography textStyle="sm14">Name of Playlist</Typography>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <Typography textStyle="sm12">{formErrors.name}</Typography>
          </div>
          <div className="textArea">
            <Typography textStyle="sm14">Description of Playlist</Typography>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <Typography textStyle="sm12">{formErrors.description}</Typography>
          </div>
          <div className="buttonWrapper">
            <button disabled={exportForm.isLoading} type="submit">
              {exportForm.isLoading ? 'Exporting...' : 'Export'}
            </button>
          </div>
        </div>
      </form>
    </FormContainer>
  );
};

export default ExportForm;

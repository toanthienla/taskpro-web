import { useState } from 'react';
import { useColorScheme } from '@mui/material/styles';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditNoteIcon from '@mui/icons-material/EditNote';

function CardDescriptionMdEditor({ cardDescriptionProp, handleUpdateCardDescription }) {
  const { mode } = useColorScheme();

  const [markdownEditMode, setMarkdownEditMode] = useState(false);
  const [cardDescription, setCardDescription] = useState(cardDescriptionProp);

  const updateCardDescription = () => {
    setMarkdownEditMode(false);
    if (cardDescription === cardDescriptionProp) return;
    handleUpdateCardDescription(cardDescription);
  };

  return (
    <Box sx={{ mt: -4 }}>
      {markdownEditMode
        ? <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box data-color-mode={mode}>
            <MDEditor
              value={cardDescription}
              onChange={setCardDescription}
              previewOptions={{ rehypePlugins: [[rehypeSanitize]] }} // https://www.npmjs.com/package/@uiw/react-md-editor#security
              height={400}
              preview="edit" //  ['edit', 'live', 'preview']
            // hideToolbar={true}
            />
          </Box>
          <Button
            sx={{ alignSelf: 'flex-end' }}
            onClick={updateCardDescription}
            className="interceptor-loading"
            type="button"
            variant="contained"
            size="small">
            Save
          </Button>
        </Box>
        : <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            sx={{ alignSelf: 'flex-end' }}
            onClick={() => setMarkdownEditMode(true)}
            type="button"
            variant="contained"
            // color="info"
            size="small"
            startIcon={<EditNoteIcon />}>
            Edit
          </Button>
          <Box data-color-mode={mode}>
            {!cardDescription && <Box sx={{ color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)' }}>No description</Box>}
            <MDEditor.Markdown
              source={cardDescription}
              style={{
                whiteSpace: 'pre-wrap',
                padding: cardDescription ? '10px' : '0px',
                border: cardDescription ? '0.5px solid rgba(0, 0, 0, 0.2)' : 'none',
                borderRadius: '4px'
              }}
            />
          </Box>
        </Box>
      }
    </Box>
  );
}

export default CardDescriptionMdEditor;

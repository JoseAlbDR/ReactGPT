import { Navigate, createBrowserRouter } from 'react-router-dom';
import {
  AssistantPage,
  AudioToTextPage,
  ImageGenerationPage,
  ImageTunningPage,
  OrthographyPage,
  ProsConsPage,
  ProsConsStreamPage,
  TextToAudioPage,
  TranslatePage,
} from '../pages';
import DashboardLayout from '../layouts/DashboardLayout';

export const menuRoutes = [
  {
    to: '/orthography',
    icon: 'fa-solid fa-spell-check',
    title: 'Orthography',
    description: 'Correcting spelling',
    component: <OrthographyPage />,
  },
  {
    to: '/pros-cons',
    icon: 'fa-solid fa-code-compare',
    title: 'Pros & Cons',
    description: 'Pro&Cons compare',
    component: <ProsConsPage />,
  },
  {
    to: '/pros-cons-stream',
    icon: 'fa-solid fa-water',
    title: 'As stream',
    description: 'As message stream',
    component: <ProsConsStreamPage />,
  },
  {
    to: '/translate',
    icon: 'fa-solid fa-language',
    title: 'Traduction',
    description: 'Text to other languages',
    component: <TranslatePage />,
  },
  {
    to: '/text-to-audio',
    icon: 'fa-solid fa-podcast',
    title: 'Text to audio',
    description: 'Convert text to audio',
    component: <TextToAudioPage />,
  },
  {
    to: '/image-generation',
    icon: 'fa-solid fa-image',
    title: 'Images',
    description: 'Generate images',
    component: <ImageGenerationPage />,
  },
  {
    to: '/image-tunning',
    icon: 'fa-solid fa-wand-magic',
    title: 'Edit image',
    description: 'Continuous Generation',
    component: <ImageTunningPage />,
  },
  {
    to: '/audio-to-text',
    icon: 'fa-solid fa-comment-dots',
    title: 'Audio to text',
    description: 'Convert audio to text',
    component: <AudioToTextPage />,
  },
  {
    to: '/assistant',
    icon: 'fa-solid fa-user',
    title: 'Assistant',
    description: 'Assistant Info',
    component: <AssistantPage />,
  },
];

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      ...menuRoutes.map((route) => ({
        path: route.to,
        element: route.component,
      })),
      {
        path: '',
        element: <Navigate to={menuRoutes[0].to} />,
      },
    ],
  },
]);

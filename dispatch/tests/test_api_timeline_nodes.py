from rest_framework import status

from django.urls import reverse

from dispatch.tests.cases import DispatchAPITestCase
from dispatch.tests.helpers import DispatchTestHelpers
from dispatch.models import TimelineNode

class TimelineNodesTests(DispatchAPITestCase):

    def test_create_timeline_node_unauthorized(self):
        """Create timeline node should fail with unauthenticated request"""

        # Clear authentication credentials
        self.client.credentials()

        url = reverse('api-timeline-nodes-list')

        response = self.client.post(url, None, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_empty_timeline_node(self):
        """Create timeline node should fail with empty payload"""

        url = reverse('api-timeline-nodes-list')

        response = self.client.post(url, None, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_incomplete_timeline_node(self):
        """Create timeline node should fail with missing required fields"""

        url = reverse('api-timeline-nodes-list')

        # timeline node data is missing headline
        data = {
            'snippet': 'test',
        }

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        self.assertTrue('headline' in response.data)

    def test_create_timeline_node(self):
        """Ensure that timeline node can be created"""

        response = DispatchTestHelpers.create_timeline_node(self.client, headline='testTimelineNode')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['headline'], 'testTimelineNode')

    def test_delete_timeline_node_unauthorized(self):
        """Delete timeline node should fail with unauthenticaed request"""

        video = DispatchTestHelpers.create_timeline_node(self.client, 'testVideo')

        # Clear authentication credentials
        self.client.credentials()

        url = reverse('api-timeline-nodes-detail', args=[video.data['id']])

        response = self.client.delete(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_timeline_node(self):
        """Ensure that timeline node can be deleted"""

        node = DispatchTestHelpers.create_timeline_node(self.client)

        url = reverse('api-timeline-nodes-detail', args=[node.data['id']])

        # Successful deletion should return 204
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # Can't delete a video that has already been deleted
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_timeline_node(self):
        """Ensure that timeline node can be updated"""
        createNodeResponse = DispatchTestHelpers.create_timeline_node(self.client)
        nodeId = createNodeResponse.data['id']
        updatedHeadline = 'updatedHeadline'
        updateHeadlineResponse = DispatchTestHelpers.update_timeline_node(self.client, timelineNodeId=nodeId, updatedProperty='headline', value=updatedHeadline)

        # Successful updation should return 200
        self.assertEqual(updateHeadlineResponse.status_code, status.HTTP_200_OK)
        self.assertEqual(updateHeadlineResponse.data['headline'], updatedHeadline)
        
        # Delete updated video
        url = reverse('api-timeline-nodes-detail', args=[nodeId])
        deleteNodeResponse = self.client.delete(url, format='json')
        self.assertEqual(deleteNodeResponse.status_code, status.HTTP_204_NO_CONTENT)

